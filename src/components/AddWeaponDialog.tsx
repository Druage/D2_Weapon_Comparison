import {Close, Content, DialogPortal, Overlay} from "@radix-ui/react-dialog";

export default function AddWeaponDialog() {
    return (
        <DialogPortal>
            <Overlay className={"fixed inset-0 bg-gray-900 opacity-70"}/>
            <Content className={"fixed inset-0 z-50 m-auto h-40 w-60 bg-white"}>
                <button>Submit</button>
                <Close>CLOSE</Close>
            </Content>
        </DialogPortal>
    );
}