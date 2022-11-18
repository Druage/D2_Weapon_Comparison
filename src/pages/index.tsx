import Header from "../components/Header";
import WeaponList from "../components/WeaponList";
import ComparisonList from "../components/ComparisonList";
import {Dialog as DialogRoot} from "@radix-ui/react-dialog";
import {useState} from "react";
import AddWeaponDialog from "../components/AddWeaponDialog";

export default function Home() {

    const [isAddWeaponDialogOpen, setIsAddWeaponDialogOpen] = useState<boolean>(false);

    const PageLayout = ({children}: any) => <DialogRoot open={isAddWeaponDialogOpen}
                                                        onOpenChange={(open) => setIsAddWeaponDialogOpen(open)}>
        <div
            className={"_page-layout flex flex-col min-h-screen min-w-screen h-auto max-w-7xl mx-auto"}>
            {children}
        </div>
    </DialogRoot>

    return (
        <PageLayout>

            <AddWeaponDialog/>

            <Header/>

            <div className={"flex-1 relative"}>
                <WeaponList/>

                <ComparisonList/>
            </div>

        </PageLayout>
    )
}
