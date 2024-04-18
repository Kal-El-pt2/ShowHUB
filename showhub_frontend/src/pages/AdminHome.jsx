import React, { useState } from 'react';
import AdminNavbar from '../components/ui/AdminNavbar';
import { Button, SegmentedControl } from '@mantine/core';
import axiosInstance from '../Auth/axios';
import classes from './GradientSegmentedControl.module.css';

export default function AdminHome() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [showAddTheatreForm, setShowAddTheatreForm] = useState(false);
  const [AddShowForm, setAddShowForm] = useState(false); // Add state for theatre form
  const [deletemovieForm, setdeletemovieForm] = useState(false);
  const [deletetheatreForm, setdeletetheatreForm] = useState(false);
  const [deleteshowForm, setdeleteshowForm] = useState(false);
  const [deletescreenForm, setdeletescreenForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    actors: '',
    genre: '',
    trailerLink: '',
    releaseDate: '',
    runningTime: '',
    createdAt: '',
    movieFormat: '',
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowAddMovieForm(option === 'Add Movie');
    setShowAddTheatreForm(option === 'Add Theatre'); // Show theatre form if 'Add Theatre' option is selected
    setAddShowForm(option === 'Add Show');
    setdeletemovieForm(option === 'Delete Movie');
    setdeletetheatreForm(option === 'Delete Theatre');
    setdeleteshowForm(option === 'Delete Show');
    setdeletescreenForm(option === 'Delete Screen');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMovie = async () => {
    try {
      const response = await axiosInstance.post('/addmovie', formData);
      console.log(response.data);
      // Optionally, you can redirect or display a success message here
    } catch (error) {
      console.error('Error adding movie:', error);
      // Handle error
    }
  };

  const handleAddTheatre = async()=>{
    try{
      const response = await axiosInstance.post('/addtheatre', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding theatre:', error);
    }
  }
  const handleAddShow = async()=>{
    try{
      const response = await axiosInstance.post('/addshow', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding show:', error);
    }
  }

  const handledeletemovie = async()=>{
    try{
      const response = await axiosInstance.post('/deletemovie', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding show:', error);
    }
  }
  const handledeletetheatre = async()=>{
    try{
      const response = await axiosInstance.post('/deletetheatre', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding theatre:', error);
    }
  }
  const handledeleteshow = async()=>{
    try{
      const response = await axiosInstance.post('/deleteshow', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding show:', error);
    }
  }
  const handledeletescreen = async()=>{
    try{
      const response = await axiosInstance.post('/deletescreen', formData);
      console.log(response.data);
    }catch(error){
      console.error('Error adding screen:', error);
    }
  }

  
  return (
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <SegmentedControl
          radius="xl"
          size="md"
          data={['Add Movie', 'Modify Movie', 'Delete Movie', 'Add Theatre', 'Modify Theatre', 'Delete Theatre', 'Add Screen', 'Modify Screen', 'Delete Screen', 'Add Show', 'Modify Show', 'Delete Show']}
          classNames={classes}
          onChange={handleOptionChange}
          value={selectedOption}
          style={{ marginBottom: '20px' }}
        />

{showAddMovieForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Description:
              <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ padding: '8px' }}></textarea>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Actors:
              <input type="text" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Genre:
              <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Trailer Link:
              <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Release Date:
              <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Running Time:
              <input type="text" name="runningTime" value={formData.runningTime} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Created At:
              <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Movie Format:
              <input type="text" name="movieFormat" value={formData.movieFormat} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleAddMovie} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Add Movie
            </Button>
          </form>
        )}
        
        {showAddTheatreForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              TheatreName:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Number Of Screens:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              City:
              <input type="text" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Address:
              <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleAddTheatre} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Add Theare
            </Button>
          </form>
        )}

        {AddShowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              MovieID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              StartingTime:
              <input type="time" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              EndTime:
              <input type="time" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Price:
              <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              TheatreID:
              <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              ScreenID:
              <input type="text" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              isActive:
              <input type="text" name="runningTime" value={formData.runningTime} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              DateOfShow:
              <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleAddShow} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Add Show
            </Button>
          </form>
        )}

        {deletemovieForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Movie Name:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handledeletemovie} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Movie
            </Button>
          </form>
        )}
        {deletetheatreForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Theatre ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handledeletetheatre} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Movie
            </Button>
          </form>
        )}
        {deleteshowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Show ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handledeleteshow} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Movie
            </Button>
          </form>
        )}
        {deletescreenForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Screen ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handledeletescreen} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Movie
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

