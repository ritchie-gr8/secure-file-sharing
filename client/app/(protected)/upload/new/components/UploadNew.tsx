"use client";

import { searchEmail } from "@/action/file-handler";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const emailFormSchema = z.object({
  recipient_email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  expiration_date: z
    .date()
    .refine(
      (val) => val >= new Date(),
      "Expiration date must be in the future"
    ),
  fileUpload: z
    .instanceof(File, { message: "Please select a file" })
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
          file.type
        ),
      "Only images (jpg, jpeg, png) and PDF files are allowed"
    )
    .refine(
      (file) => file && file.size <= 4 * 1024 * 1024, // 4mb
      "File size must be less than 4MB"
    ),
});

const UploadNew = ({ token }: { token: string | null }) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [emailSuggestions, setEmailSuggestions] = useState<{ email: string }[]>(
    []
  );

  const [isFetchingEmails, setIsFetchingEmails] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const tomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipient_email: "",
      password: "",
      expiration_date: tomorrowDate(),
    },
  });

  const recipient_email = form.watch("recipient_email");
  const password = form.watch("password");
  const expiration_date = form.watch("expiration_date");

  const isFormFilled = recipient_email && password && expiration_date;

  useEffect(() => {
    const fetchEmailSuggestions = async (query: string) => {
      if (!query) return;
      try {
        setIsFetchingEmails(true);
        const res = await searchEmail(query);
        setEmailSuggestions(res.emails || []);
      } catch {
        console.log("Failed to fetch email suggestions");
      } finally {
        setIsFetchingEmails(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (recipient_email) {
        fetchEmailSuggestions(recipient_email);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [recipient_email]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("fileUpload", file);
  };

  const onSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    try {
      setIsPending(true);

      console.log("base", API_BASE_URL);
      console.log("full", `${API_BASE_URL}/file/upload`);

      const formData = new FormData();
      formData.append("recipient_email", values.recipient_email);
      formData.append("password", values.password);
      formData.append("expiration_date", values.expiration_date.toISOString());
      formData.append("fileUpload", values.fileUpload);

      const res = await fetch(`${API_BASE_URL}/file/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success(result.message);
        router.push("/upload");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to upload file");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload new file</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="recipient_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Email</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type or select recipient's email" />
                      </SelectTrigger>
                      <SelectContent>
                        <Input placeholder="Type to search email" {...field} />
                        {isFetchingEmails ? (
                          <SelectItem value="1" disabled>
                            Loading...
                          </SelectItem>
                        ) : emailSuggestions?.length > 0 ? (
                          emailSuggestions.map((email) => (
                            <SelectItem key={email.email} value={email.email}>
                              {email.email}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="2" disabled>
                            No emails found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      enablePasswordToggle
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration_date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={isPending}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "placeholder:text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUpload"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileUpload}
                      disabled={!isFormFilled || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" isLoading={isPending}>
              Upload File
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadNew;
