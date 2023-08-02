import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Roster } from '../pages/Roster';

type Player = {
    id: number
    name: string
    cost: number
    team: string
}
type RosterListProps = {
    player: Player;
    handleRemovePlayer: (playerId: number) => void; // Define the prop for handleRemovePlayer
    editMode: boolean;
  };
  
const RosterList: React.FC<RosterListProps> = ({ player, handleRemovePlayer, editMode }) => {
    const { id, name, cost, team } = player;
  
    const handleRemove = () => {
      handleRemovePlayer(player.id); // Call the handleRemovePlayer function with the player's id
    };


    return (
    <>
    <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    {editMode ?
                    <></>
                    : <Button
                    onClick={handleRemove}
                    variant="danger"
                    size="sm"
                >
                    Remove
                </Button>}
                </Card.Title>
                <Card.Text className="d-flex justify-content-between">
                    <p>Team: {team}</p>
                    <p>Cost: ${cost}</p>
                </Card.Text>
            </Card.Body>
        </Card>
                </>
    );
};

export default RosterList;