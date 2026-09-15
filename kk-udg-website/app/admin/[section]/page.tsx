import { notFound } from "next/navigation";
import AdminBar from "@/components/admin/AdminBar";
import ListEditor from "@/components/admin/ListEditor";
import ObjectEditor from "@/components/admin/ObjectEditor";
import { getSectionConfig } from "@/lib/sections";
import { getContent, type SiteContent } from "@/lib/content";
import "@/components/admin/admin.css";

export default async function AdminSectionPage({
  params,
}: {
  params: { section: string };
}) {
  const config = getSectionConfig(params.section);
  if (!config) return notFound();

  const content = await getContent();
  const data = content[config.slug as keyof SiteContent];

  return (
    <div className="admin-shell">
      <AdminBar />
      <div className="admin-wrap">
        <h1 className="admin-title">{config.label}</h1>
        <p className="admin-sub">{config.description}</p>
        {config.kind === "list" ? (
          <ListEditor
            section={config.slug}
            fields={config.fields}
            initialItems={data as unknown as Record<string, string>[]}
            emptyItemLabel={config.emptyItemLabel}
          />
        ) : (
          <ObjectEditor
            section={config.slug}
            fields={config.fields}
            initialData={data as unknown as Record<string, string>}
          />
        )}
      </div>
    </div>
  );
}
