import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your Links</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {userLinks.length} link{userLinks.length !== 1 ? "s" : ""} created
        </p>
      </div>

      {userLinks.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Code</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <Badge variant="secondary">{link.shortCode}</Badge>
                </TableCell>
                <TableCell className="max-w-sm truncate">
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:underline"
                  >
                    {link.originalUrl}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {link.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
