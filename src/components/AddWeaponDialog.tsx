import {Close, Content, DialogPortal, Overlay} from "@radix-ui/react-dialog";

export default function AddWeaponDialog() {
    const ActionsBar = () => (
        <div className={"flex h-16 items-center justify-evenly bg-[#222222]"}>
            <Close className={"rounded-3xl bg-gray-900 px-4 py-2 text-white"}>
                Cancel
            </Close>
            <button className={"text-white"}>Submit</button>
        </div>
    );

    const Form = () => (
        <form
            className={
                "flex w-full flex-grow-0 flex-col items-center justify-center gap-4 bg-[#323232] p-8"
            }
        >
            <input placeholder={"Name"} className={"w-full p-2"} type={"text"}/>

            <div className={"flex w-full items-center justify-evenly gap-2"}>
                <input
                    placeholder={"Low"}
                    className={"w-24 flex-1 p-2"}
                    type={"number"}
                />
                <span>to</span>
                <input
                    placeholder={"High"}
                    className={"w-24 flex-1 p-2"}
                    type={"number"}
                />
            </div>

            <input placeholder={"%"} className={"w-full p-2"} type={"number"}/>
            <input placeholder={"%"} className={"w-full p-2"} type={"number"}/>
            <input placeholder={"%"} className={"w-full p-2"} type={"number"}/>
        </form>
    );

    return (
        <DialogPortal>
            <Overlay className={"fixed inset-0 bg-gray-900 opacity-70"}/>
            <Content
                className={
                    "fixed inset-0 z-50 m-auto h-fit w-96 border-4 border-[#929292] bg-white"
                }
            >
                <Form/>
                <ActionsBar/>
            </Content>
        </DialogPortal>
    );
}