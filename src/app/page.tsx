
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const projects = [
    {
      name: "Agent Store (Final)",
      description: "La tienda de agentes con el chatbot de ayuda integrado.",
      href: "/agent-store"
    },
    {
      name: "LLM Agent Store",
      description: "La primera versión de la tienda de agentes.",
      href: "/llm-agent-store"
    },
    {
      name: "Dashboard 360 (Nuevo)",
      description: "El nuevo dashboard para equipos y empresas.",
      href: "/dashboard-360"
    }
  ];

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Mis Proyectos
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Selecciona un proyecto para ver o continuar desarrollando.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.sort((a, b) => a.name.localeCompare(b.name)).map((project) => (
          <Link href={project.href} key={project.name} className="block hover:scale-105 transition-transform duration-200">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.name}
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
