import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6">
      <h1 className="font-headline text-6xl text-brand uppercase leading-none">
        Дашборд
      </h1>
      <p className="text-muted-foreground text-lg text-center">
        Платформа в разработке. Скоро здесь будет всё.
      </p>
      <Link href="/" className="text-brand underline text-sm">
        ← На главную
      </Link>
    </div>
  );
}
