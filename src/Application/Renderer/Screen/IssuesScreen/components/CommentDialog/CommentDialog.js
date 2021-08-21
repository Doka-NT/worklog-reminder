import { Button, Card, Dialog } from "react-onsenui"
import Input from "../../../../Components/Input"
import './style.less'

export default function CommentDialog() {
    return (
        <Dialog
            isOpen={false}
            isCancelable={true}
        >
            <Card>
                <div className="title">
                    What did you do?
                </div>
                <div className="content">
                    <Input
                        class="comment-input"
                        placeholder="Type some comment here"
                        modifier="underbar"
                    />
                    <p></p>
                    <Button modifier="large">Ok</Button>
                </div>
            </Card>
        </Dialog>
    )
}