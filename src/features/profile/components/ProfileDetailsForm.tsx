"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/server/auth/auth";
import { Controller, useForm } from "react-hook-form";
import { profileFormSchema, ProfileFormSchema } from "../forms/profileForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/common/UserAvatar";
import { XIcon } from "lucide-react";

const ProfileDetailsForm = ({ user }: { user: User }) => {
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      name: user.name || "",
      image: user.image || null,
    },
    resolver: zodResolver(profileFormSchema),
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("image", base64String, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const imagePreview = form.watch("image");

  const handleRemoveImage = () => {
    if (user.image) {
      form.setValue("image", user.image, { shouldDirty: true });
    } else {
      form.setValue("image", null, { shouldDirty: true });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Akun</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan Nama Anda"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="image"
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Profile Image</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeImage(e)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {imagePreview && (
              <div className="relative size-16">
                <UserAvatar
                  name={user.name}
                  image={imagePreview}
                  classname="size-16"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            )}
            <Button type="submit" className="bg-sky-700 hover:bg-sky-700/80">
              Simpan Perubahan
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsForm;
