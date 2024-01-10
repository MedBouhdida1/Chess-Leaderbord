import { Input, Flex, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
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
import { useDispatch } from 'react-redux';
import { editPlayer } from '../Store/actions';

const ModalModifyPlayer = ({  setCurrentItem,  currentItem, initialRef, isOpenModal1,  onCloseModal1 }:any) => {
    //Chakra Toast
    const toast = useToast()
    const dispatch = useDispatch()

    //Modif Player Function
    const handleModif = (e:any, player_id:any) => {
        e.preventDefault()
        onCloseModal1();

        dispatch(editPlayer(player_id,currentItem))
        
        toast({
            title: 'Player Modified',
            description: "Player has been Modified successfully!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })



    }
    return (

        //Modal Modif Player
        <Modal
            initialFocusRef={initialRef}

            isOpen={isOpenModal1}
            onClose={onCloseModal1}
        >
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={(event) => handleModif(event, currentItem.player_id)}>

                    <ModalHeader>Modify Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type='text' placeholder='Username' value={currentItem?.username || ''} onChange={(event) => setCurrentItem({ ...currentItem, username: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Score</FormLabel>
                            <Input placeholder='Score' type='number' value={currentItem?.score || ''} onChange={(event) => setCurrentItem({ ...currentItem, score: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Rank</FormLabel>
                            <Input placeholder='Rank' type='number' value={currentItem?.rank || ''} onChange={(event) => setCurrentItem({ ...currentItem, rank: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Wins</FormLabel>
                            <Input placeholder='Wins' type='number' value={currentItem?.win_count || ''} onChange={(event) => setCurrentItem({ ...currentItem, win_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Loses</FormLabel>
                            <Input placeholder='Loses' type='number' value={currentItem?.loss_count || ''} onChange={(event) => setCurrentItem({ ...currentItem, loss_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Draws</FormLabel>
                            <Input placeholder='Loses' type='number' value={currentItem?.draw_count || ''} onChange={(event) => setCurrentItem({ ...currentItem, draw_count: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' type='text' value={currentItem?.title || ''} onChange={(event) => setCurrentItem({ ...currentItem, title: event.target.value })} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Status</FormLabel>
                            <Input placeholder='Status' type='text' value={currentItem?.status || ''} onChange={(event) => setCurrentItem({ ...currentItem, status: event.target.value })} />
                        </FormControl>






                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' colorScheme='blue' mr={3}  >
                            Save
                        </Button>
                        <Button onClick={onCloseModal1}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )

}



export default ModalModifyPlayer;