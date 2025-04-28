import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordChangeSchema } from "../schema/profile-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserPassword } from "@/action/profile-handler";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PasswordChange = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordChangeSchema>) => {
    startTransition(async () => {
      try {
        const res = await updateUserPassword(values);
        if (res.status === 400) {
          toast.error(res.message);
        }

        if (res.status === "success") {
          toast.success("Password update successfully");
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="p-4">
      <span className="text-center font-bold">Update user password</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
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
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
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
              name="new_password_confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      enablePasswordToggle
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChange;
