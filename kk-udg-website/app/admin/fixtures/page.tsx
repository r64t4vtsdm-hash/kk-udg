import AdminBar from "@/components/admin/AdminBar";
import FixturesEditor from "@/components/admin/FixturesEditor";
import { getContent } from "@/lib/content";
import "@/components/admin/admin.css";

export default async function AdminFixturesPage() {
  const content = await getContent();

  return (
    <div className="admin-shell">
      <AdminBar />
      <div className="admin-wrap">
        <h1 className="admin-title">Raspored</h1>
        <p className="admin-sub">Datumi i protivnici za jesenji i proljećni dio sezone.</p>
        <FixturesEditor
          initialFirstLeg={content.fixtures.firstLeg}
          initialSecondLeg={content.fixtures.secondLeg}
        />
      </div>
    </div>
  );
}
