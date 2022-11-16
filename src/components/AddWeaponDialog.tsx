import {Close, Content, DialogPortal, Overlay} from "@radix-ui/react-dialog";

export default function AddWeaponDialog() {
    return (<DialogPortal>
        <Overlay className={"fixed inset-0 bg-gray-900 opacity-70"}/>
        <Content className={"z-50 fixed inset-0 w-60 h-40 bg-white m-auto"}>
            <button>Submit</button>
            <Close>CLOSE</Close>
        </Content>
    </DialogPortal>)
}