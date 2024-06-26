import React, { useState, useEffect } from 'react';
import { Group, Table, ScrollArea, Button, Modal, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Auth/axios';

export default function TheatreTable({ moviename, city_selected }) {
  const [scrolled, setScrolled] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTheatres();
  }, [moviename, city_selected]);

  const fetchTheatres = () => {
    axiosInstance
      .get(`/movies/${encodeURIComponent(moviename)}/theatres/${encodeURIComponent(city_selected)}`)
      .then(response => setTheatres(response.data))
      .catch(error => console.error('Error fetching theatres:', error));
  };

  const handleShowSelect = (theatreId) => {
    axiosInstance
      .get(`/shows/movies/${encodeURIComponent(moviename)}/theatre/${encodeURIComponent(theatreId)}`)
      .then(response => {
        setSelectedShow(response.data);
        setShowModal(true);
      })
      .catch(error => console.error('Error fetching show details:', error));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const rows = theatres.map((theatre, index) => (
    <Table.Tr key={theatre.TheatreID}>
      <Table.Td>{theatre.TheatreName}</Table.Td>
      <Table.Td>{theatre.address}</Table.Td>
      <Table.Td>
        <Button onClick={() => handleShowSelect(theatre.TheatreID)}>Select Show</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          <Table.Thead style={{ position: 'sticky', top: 0, backgroundColor: scrolled ? '#f0f0f0' : 'transparent' }}>
            <Table.Tr>
              <Table.Th>Theatre Name</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal opened={showModal} onClose={() => setShowModal(false)} title="Show Details" size="xl">
        {selectedShow ? (
          <>
            {selectedShow.map((show, index) => (
              <Group key={index} position="center" noWrap>
                <Text>
                  {show.title} - {formatDate(show.date_of_movie)} {show.StartTiming} - {show.EndTime} - Rs.{show.Price}
                </Text>
                <Link to={`/shows/${show.ShowID}/selectseats/${show.ScreenID}/moviename/${show.title}/price/${show.Price}`}>
                  <Button>Select seats</Button>
                </Link>
              </Group>
            ))}
          </>
        ) : (
          <Text>No show details available.</Text>
        )}
      </Modal>
    </>
  );
}