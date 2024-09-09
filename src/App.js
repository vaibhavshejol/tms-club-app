import './App.css';
import {  } from 'bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/Navigation/HomeScreen';
import HomePage from './components/Navigation/HomePage';
import AddRole from './components/Role/AddRole'
import ViewRoles from './components/Role/ViewRoles';
import MeetingRoles from './components/Role/MeetingRoles';
import AddMember from './components/Member/AddMember';
import ViewMembers from './components/Member/ViewMembers';
import ScheduleMeeting from './components/Meeting/ScheduleMeeting';
import ViewMeetings from './components/Meeting/VeiwMeetings';
import ViewAssignedMembers from './components/Member/ViewAssignedMembers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element = {<HomeScreen/>}/>
        <Route path='/home-page' element = {<HomePage/>}/>
        <Route path ='/add-role' element = {<AddRole/>}/>
        <Route path='/view-role' element = {<ViewRoles/>}/>
        <Route path="/meeting-roles" element={<MeetingRoles />} />
        <Route path='/add-member' element = {<AddMember/>}/>
        <Route path='/view-members' element = {<ViewMembers/>}/>
        <Route path='/create-meeting' element = {<ScheduleMeeting/>}/>
        <Route path='/view-meetings' element = {<ViewMeetings/>}/>
        <Route path="/assigned-members/:meetingId" element={<ViewAssignedMembers />} /> {/* Route for viewing assigned members */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
