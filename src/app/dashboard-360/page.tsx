export default function Dashboard360Page() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col items-center justify-center text-center h-[80vh]">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Selecciona una sección
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Elige una de las opciones del menú lateral para empezar a configurar tu espacio de trabajo.
        </p>
      </div>
    </main>
  );
}
