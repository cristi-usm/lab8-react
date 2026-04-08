import { SelectTab } from "../SelectTab/SelectTab";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-50">
        <div className="text-[#E50914] font-black text-xl tracking-tighter uppercase italic">The Best Movies <span className="text-white not-italic">In The World</span></div>
        <SelectTab/>
    </nav>
  )
}

export default Navbar;