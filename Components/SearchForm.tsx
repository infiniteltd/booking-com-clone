"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BedDoubleIcon } from "lucide-react";

export const formSchema = z.object({
  location: z.string().min(2, "Must be 2 characters or more").max(50),
  dates: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
  adults: z.coerce
    .number()
    .min(1, "Please select at least 1 adult")
    .max(12, { message: "Max 12 adults occupancy" }),
  children: z.coerce
    .number()
    .min(0)
    .max(12, { message: "Max 12 children occupancy" }),
  rooms: z.coerce.number().min(1, {
    message: "Please select at least 1 room",
  }),
});

function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dates: {
        from: new Date(),
        to: new Date(),
      },
      adults: 1,
      children: 0,
      rooms: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // router.push(...);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-2 rounded-lg"
      >
        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full lg:max-w-sm">
              <FormLabel>
                Location
                <BedDoubleIcon className="inline ml-2 h-4 w-4 text-white" />
              </FormLabel>
              <FormControl>
                <Input placeholder="London, UK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* From Date */}
        <FormField
          control={form.control}
          name="dates.from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* To Date */}
        <FormField
          control={form.control}
          name="dates.to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Adults */}
        <FormField
          control={form.control}
          name="adults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adults</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={12} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Children */}
        <FormField
          control={form.control}
          name="children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Children</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={12} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rooms */}
        <FormField
          control={form.control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 lg:mt-6">
          Search
        </Button>
      </form>
    </Form>
  );
}

export default SearchForm;
