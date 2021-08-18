import { Dialog, Card, Button } from "react-onsenui"
export default function TimeDialog() {
    return (
        <Dialog
            isOpen={false}
            onCancel={() => { }}
            cancelable>
            <Card>
                <div className="title">
                    How much time your spent?
                </div>
                <div className="content">
                    <div style={{ textAlign: 'justify' }}>
                        <Button modifier="outline" className="time-button" data-minutes="5">5m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="10">10m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="15">15m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="30">30m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="60">1h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="90">1h 30m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="120">2h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="150">2h 30m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="180">3h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="210">3h 30m</Button>
                        <Button modifier="outline" className="time-button" data-minutes="240">4h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="300">5h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="360">6h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="420">7h</Button>
                        <Button modifier="outline" className="time-button" data-minutes="480">8h</Button>
                    </div>
                </div>
            </Card>
        </Dialog>
    )
}