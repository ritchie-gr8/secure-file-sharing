"use client";

import { z } from "zod";
import { ReceiveColumnsType } from "./columns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CellActionProps {
  data: ReceiveColumnsType;
  token: string | null;
}

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const CellAction = ({ data, token }: CellActionProps) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClickHandler = () => {
    handleToggle();
  };

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/file/retrieve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shared_id: data.file_id,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to retrieve file");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", data.file_name);
      link.click();
      link.remove();
      form.reset();
      handleToggle();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button size="icon" variant={"outline"} onClick={onClickHandler}>
        <DownloadIcon className="size-4" />
      </Button>
      <Dialog modal open={isOpen} onOpenChange={handleToggle}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>File Password</DialogTitle>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        enablePasswordToggle
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isLoading} className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CellAction;
