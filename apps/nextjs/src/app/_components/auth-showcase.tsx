import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@acme/ui/button";

import { auth, getSession } from "~/auth/server";

export async function AuthShowcase() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <form className="flex w-full max-w-sm flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <Button
            size="lg"
            formAction={async (formData: FormData) => {
              "use server";
              await auth.api.signInEmail({
                body: {
                  email: formData.get("email") as string,
                  password: formData.get("password") as string,
                },
                headers: await headers(),
              });
              redirect("/");
            }}
          >
            Se connecter
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Connecté en tant que {session.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: await headers(),
            });
            redirect("/");
          }}
        >
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}
