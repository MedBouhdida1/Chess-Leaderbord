
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import ModalModifyPlayer from "./ModalModifyPlayer";
import { Button, useToast } from '@chakra-ui/react';
import {
    useDisclosure,

} from '@chakra-ui/react'
import { useRef } from 'react';
import { removePlayer } from "../Store/actions";
import InputWithLabel from "./InputWithLabel";
const List: React.FC = () => {

    const players = useSelector((state: any) => state.players.data);
    //search
    const [searchTerm, setSearchTerm] = React.useState("");
    const SearchedList = players?.filter((res: any) => res.username.toLowerCase().includes(searchTerm.toLowerCase()))
    const handleSearchInput = (event: any) => {
        console.log(event);
        setSearchTerm(event.target.value);
    };
    const [currentItem, setCurrentItem] = React.useState<any>()
    const dispatch = useDispatch()
    //React Pagination Settings
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of items to display per page
    const pageCount = Math.ceil(SearchedList?.length / itemsPerPage); // Total number of pages
    const offset = currentPage * itemsPerPage; // Offset for the current page
    const currentPageItems = SearchedList?.slice(offset, offset + itemsPerPage); // Items to display for the current page
    const toast = useToast()
    const handleRemovePlayer = (item: any) => {
        toast({
            title: 'Player Deleted.',
            description: "Player has been deleted successfully!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        dispatch(removePlayer(item.player_id))
        // const newPlayers = players.filter(
        //   (res) => item.player_id !== res.player_id
        // );
        // setPlayers(newPlayers);
    };


    ///item comp
    const { isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1 } = useDisclosure();
    const initialRef = useRef(null)



    //OnClick Modify Player Button 
    const onOpenModal1WithObject = (object: any) => {
        setCurrentItem(object);
        onOpenModal1();
    }
    return (
        <>
            <InputWithLabel


                id="search"
                value={searchTerm}
                onInputChange={handleSearchInput}
            >
                <strong>Search by username:</strong>
            </InputWithLabel>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">Avatar</th>
                        <th scope="col" className="text-center">Username</th>
                        <th scope="col" className="text-center">Score</th>
                        <th scope="col" className="text-center">Rank</th>
                        <th scope="col" className="text-center">Wins</th>
                        <th scope="col" className="text-center">Losses</th>
                        <th scope="col" className="text-center">Draws</th>
                        <th scope="col" className="text-center">Title</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* maps over the currentPageItems array and generates a series of <Item> */}
                    {currentPageItems?.map((item: any) => (
                        <tr key={item.player_id}>
                            <td className="text-center"><img src={item.avatar} alt="" width={"50px"} className="img-fluid" /></td>
                            <td className="text-center">{item.username}</td>
                            <td className="text-center">{item.score}</td>
                            <td className="text-center">{item.rank}</td>
                            <td className="text-center">{item.win_count}</td>
                            <td className="text-center">{item.loss_count}</td>
                            <td className="text-center">{item.draw_count}</td>
                            <td className="text-center">{item.title}</td>
                            <td className="text-center">{item.status}</td>
                            {/* Modify Player Buton */}
                            <td className="text-center"><Button onClick={() => onOpenModal1WithObject(item)} id="btn-add-contact" className="btn btn-primary" style={{ marginRight: '10px' }}>
                                <i className="ti ti-users text-black me-1 fs-5" /> Modifiy Player
                            </Button>

                                {/* Delete Player Button */}
                                <button type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#al-warning-alert" className="btn btn-danger" onClick={() => setCurrentItem(item)}>
                                    Delete
                                </button>
                            </td>

                        </tr >
                    ))}
                </tbody>
            </table>

            <ModalModifyPlayer

                setCurrentItem={setCurrentItem}

                currentItem={currentItem}
                initialRef={initialRef}
                isOpenModal1={isOpenModal1}
                onOpenModal1={onOpenModal1}
                onCloseModal1={onCloseModal1}>

            </ModalModifyPlayer>
            {/* Pagination */}
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />

            {/* Modal Confirm player Deletion */}
            <div
                className="modal fade"
                id="al-warning-alert"
                tabIndex={-1}
                aria-labelledby="vertical-center-modal"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-sm">
                    <div
                        className="modal-content modal-filled bg-light-danger"
                    >
                        <div className="modal-body p-4">
                            <div className="text-center text-warning">
                                <i className="ti ti-hexagon-letter-x fs-7"></i>
                                <h4 className="mt-2">Delete Player</h4>
                                <p className="mt-3">
                                    Are you certain about deleting the player with username : {currentItem?.username}
                                </p>
                                <button
                                    id='confirm'
                                    type="button"
                                    className="btn btn-light my-2"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleRemovePlayer(currentItem)}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}





export default List;