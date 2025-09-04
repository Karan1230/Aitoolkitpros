
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/admin')
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">Welcome, {user.email}</p>
        
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Website Management</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This is a placeholder for your website management tools. You can build out features here to manage users, content, and SEO.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">View and manage all AI tools.</p>
                            <Button asChild variant="outline">
                                <Link href="/tools">Go to Tools</Link>
                            </Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>SEO Optimization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Use the YouTube SEO tool to optimize video content.</p>
                            <Button asChild variant="outline">
                                <Link href="/tools/youtube-seo-tool">Manage SEO</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
