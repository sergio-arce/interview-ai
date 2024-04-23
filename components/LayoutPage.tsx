import { AppBar } from "./AppBar"

export const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <>
    <AppBar />
    {children}
  </>
}
