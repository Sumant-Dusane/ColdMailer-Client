import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface QuickComposeProps {
    onClick: Function;
}

export default function QuickCompose({ onClick }: QuickComposeProps) {
    return (
        <Button onClick={(_) => onClick}>
            Quick Compose
        </Button>
    )
}

export function QuickComposeModal() {
    return (
        <Dialog>
            <DialogContent>
                <Input placeholder="Intent" />
                <Button>Submit</Button>
            </DialogContent>
        </Dialog>
    )
}