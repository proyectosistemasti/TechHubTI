import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

export function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query, // Establecer el valor por defecto desde el estado del componente padre
    },
  });

  useEffect(() => {
    form.reset({ query }); // Resetea el formulario cuando `query` cambia
  }, [query, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query); // Actualiza el estado del componente padre con el valor de búsqueda
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search shortcuts by title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex gap-1"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
