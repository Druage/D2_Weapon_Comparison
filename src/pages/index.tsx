import Header from "../components/Header";
import WeaponList from "../components/WeaponList";
import ComparisonList from "../components/ComparisonList";
import {Dialog as DialogRoot} from "@radix-ui/react-dialog";
import {useState} from "react";
import AddWeaponDialog from "../components/AddWeaponDialog";

export default function Home() {
    const [isAddWeaponDialogOpen, setIsAddWeaponDialogOpen] =
        useState<boolean>(false);

    const PageLayout = ({children}: any) => (
        <DialogRoot
            open={isAddWeaponDialogOpen}
            onOpenChange={(open) => setIsAddWeaponDialogOpen(open)}
        >
            <div
                className={
                    "_page-layout min-w-screen mx-auto flex h-auto min-h-screen max-w-7xl flex-col"
                }
            >
                {children}
            </div>
        </DialogRoot>
    );

    return (
        <PageLayout>
            <AddWeaponDialog/>

            <Header/>

            <div className={"relative flex-1"}>
                <WeaponList/>

                <ComparisonList/>
            </div>
        </PageLayout>
    );
}
