import Header from "../components/Header";
import WeaponList from "../components/WeaponList";
import ComparisonList from "../components/ComparisonList";

export default function Home() {

    const PageLayout = ({children}: any) => <div
        className={"_page-layout flex flex-col min-h-screen min-w-screen h-auto max-w-8xl mx-auto"}>
        {children}
    </div>

    return (
        <PageLayout>

            <Header/>

            <div className={"flex-1 relative "}>
                <WeaponList/>

                <ComparisonList/>
            </div>


        </PageLayout>
    )
}
