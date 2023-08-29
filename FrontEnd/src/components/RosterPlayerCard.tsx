import React, { useState } from 'react';
import { Card, Button, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { Roster } from '../pages/Roster';
import { Player } from '../App'

type RosterPlayerCardProps = {
    player: Player;
    removePlayerFromWorkingRoster: (player: Player) => void; // Define the prop for handleRemovePlayer
    matchday: number
    points: number
};

export const RosterPlayerCard: React.FC<RosterPlayerCardProps> = ({ player, removePlayerFromWorkingRoster, matchday, points }) => {
    const { id, name, cost, team, kills, placement } = player;
    return (
        <>
            <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                        <span className="fs-2">{name}</span>

                        <Button
                            onClick={() => removePlayerFromWorkingRoster(player)}
                            className="bg-secondary text-black"
                            size="sm"
                        >
                            Remove
                        </Button>
                    </Card.Title>
                    <Card.Text className="d-flex justify-content-between">
                        <div className="d-flex align-items-start">
                            <span>Points Day {matchday}:</span>
                            <button className="border-0 bg-white" data-bs-toggle="modal" data-bs-target="#scoringDetailModal">
                                {points}
                            </button>
                        </div>
                        <span>Cost: ${cost}</span>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal className="modal fade" id="scoringDetailModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
