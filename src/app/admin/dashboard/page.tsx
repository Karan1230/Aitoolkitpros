
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/admin')
  }

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'All Tools', path: '/tools' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">Welcome, {user.email}</p>
        
        <div className="grid gap-8 mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Website Management</CardTitle>
                    <CardDescription>View and manage different parts of your website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
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
                                <CardTitle>User Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">View and manage website users.</p>
                                <Button variant="outline" disabled>Manage Users</Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ads Management</CardTitle>
                <CardDescription>
                  This feature is a placeholder. You would need to implement the backend logic to save and serve these ad codes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Native Ads</h4>
                  <div className="space-y-2">
                    <Label htmlFor="native-ads-code">
                      Enter your native ads code here.
                    </Label>
                    <Textarea id="native-ads-code" placeholder="<-- Your Native Ad Code -->" className="min-h-[150px] font-mono" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Banner Ads</h4>
                  <div className="space-y-2">
                    <Label htmlFor="banner-ads-code">
                      Enter your banner ads code here.
                    </Label>
                    <Textarea id="banner-ads-code" placeholder="<-- Your Banner Ad Code -->" className="min-h-[150px] font-mono" />
                  </div>
                </div>
                <Button disabled>Save Ad Codes</Button>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Website SEO</CardTitle>
                    <CardDescription>Manage on-page SEO for your main pages. These are placeholders for future functionality.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {pages.map(page => (
                        <div key={page.path} className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-4">{page.name} Page SEO</h4>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`title-${page.path}`}>Meta Title</Label>
                                    <Input id={`title-${page.path}`} placeholder={`Enter meta title for ${page.name}`} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`description-${page.path}`}>Meta Description</Label>
                                    <Textarea id={`description-${page.path}`} placeholder={`Enter meta description for ${page.name}`} />
                                </div>
                                <Button variant="secondary" size="sm" disabled>Save Changes</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
