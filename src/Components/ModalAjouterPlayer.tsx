import { Input, Button } from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,

} from '@chakra-ui/react'

import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { addPlayer } from '../Store/actions';
import { useState } from 'react';


const ModalAjouterPlayer = ({   initialRef, isOpenModal2,  onCloseModal2 }:any) => {
    //chakra Toast
    const toast = useToast()
    const [currentItem,setCurrentItem] = useState<any>()
    //redux 
    const dispatch = useDispatch()
    //Add Player Function
    const handleAddPlayer = (e:any) => {
        e.preventDefault();
        //Generate Unique Id
        const uniqueId = uuidv4();
        //Default Avatar
        currentItem.avatar = "https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif";
        currentItem.player_id = uniqueId;
       
        dispatch(addPlayer(currentItem))
        onCloseModal2();
        toast({
            title: 'Player Added',
            description: "Player has been Added successfully!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }



    return (

        //Modal Add Player
        <Modal
            initialFocusRef={initialRef}

            isOpen={isOpenModal2}
            onClose={onCloseModal2}
        >
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleAddPlayer}>

                    <ModalHeader>Add Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type='text' placeholder='Username' onChange={(event) => setCurrentItem({ ...currentItem, username: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Score</FormLabel>
                            <Input placeholder='Score' type='number' onChange={(event) => setCurrentItem({ ...currentItem, score: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Rank</FormLabel>
                            <Input placeholder='Rank' type='number' onChange={(event) => setCurrentItem({ ...currentItem, rank: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Wins</FormLabel>
                            <Input placeholder='Wins' type='number' onChange={(event) => setCurrentItem({ ...currentItem, win_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Loses</FormLabel>
                            <Input placeholder='Loses' type='number' onChange={(event) => setCurrentItem({ ...currentItem, loss_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Draws</FormLabel>
                            <Input placeholder='Loses' type='number' onChange={(event) => setCurrentItem({ ...currentItem, draw_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' type='text' onChange={(event) => setCurrentItem({ ...currentItem, title: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Status</FormLabel>
                            <Input placeholder='Status' type='text' onChange={(event) => setCurrentItem({ ...currentItem, status: event.target.value })} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" colorScheme='blue' mr={3}  >
                            Save
                        </Button>
                        <Button onClick={onCloseModal2}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>

    )
}
export default ModalAjouterPlayer;