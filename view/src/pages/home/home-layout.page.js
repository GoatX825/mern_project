import { Outlet } from "react-router-dom"
import HeaderComponent from "../../components/header/header.component"

const HomePageLayout = () => {
      return(<>
        <HeaderComponent/>
        <Outlet/>
      </>)
}
export default HomePageLayout