import { getProductsAdmin } from "@/app/actions/admin"
import ProductsManager from "@/components/admin/products-manager"

export const revalidate = 0 // dynamically rendered

export default async function AdminProductsPage() {
  const products = await getProductsAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Digital Shop Assets</h1>
        <p className="text-sm text-neutral-400">
          Manage downloadable code templates, layout UI kits, graphics, and assets listed in your portfolio store.
        </p>
      </div>

      <ProductsManager initialProducts={products} />
    </div>
  )
}
