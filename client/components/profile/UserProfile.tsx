import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameUpdateSchema } from "../schema/profile-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataProps } from "./Profile";
import { updateUserName } from "@/action/profile-handler";
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

const UserProfile = ({ userData }: { userData: UserDataProps }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof nameUpdateSchema>>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: {
      email: userData?.email,
      name: userData?.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof nameUpdateSchema>) => {
    startTransition(async () => {
      try {
        const res = await updateUserName({ name: values.name });
        if (res.status === 400) {
          toast.error(res.message);
        }

        if (res.status === "success") {
          toast.success(`Name update successfully`);
        }
      } catch {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="p-4">
      <span className="text-center font-bold">Update Name</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
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

export default UserProfile;
