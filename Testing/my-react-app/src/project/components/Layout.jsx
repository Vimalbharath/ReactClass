import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Rating from '../pages/Rating';

const Layout = () => {
  return (
    // Outer container: Full height, column layout for header/main/footer
    // bg-light: A very light grey background for the overall page
    <div className='d-flex flex-column min-vh-100 bg-light'>

      {/* Header */}
      {/* bg-primary: A strong blue background, text-white: white text for contrast, shadow: subtle shadow for depth */}
      <Header className="bg-primary text-white shadow" />

      {/* Main Content Area: Horizontal flex for sidebar and content */}
      {/* flex-grow-1: Ensures this section takes all available vertical space */}
      {/* container-fluid: Full width, fluid layout */}
      {/* py-4: Padding top and bottom for this section */}
      <div className="d-flex flex-grow-1 container-fluid py-4">

        {/* Sidebar */}
        {/* col-md-3: 3/12 columns on medium+ screens */}
        {/* p-3: Padding inside */}
        {/* bg-dark: Dark background for the sidebar */}
        {/* text-white: White text for dark background */}
        {/* border-end border-secondary: A subtle border to separate from main content */}
        {/* rounded-start: Slightly rounded left corners for aesthetics */}
        <Sidebar className="col-md-3 p-3 bg-dark text-white border-end border-secondary rounded-start" />

        {/* Main Content (Dashboard and Rating) */}
        {/* col-md-9: 9/12 columns on medium+ screens */}
        {/* p-4: More padding for the main content area */}
        {/* bg-white: White background for clarity */}
        {/* shadow-sm: Smaller shadow for content block */}
        {/* rounded-end: Slightly rounded right corners for aesthetics */}
        <div className="col-md-9 p-4 bg-white shadow-sm rounded-end">
          {/* Dashboard Component - Consider passing background/text color props if you want its internal elements to adapt */}
          <Dashboard />
          
          {/* Rating Component - Similarly, internal elements might need props */}
          <Rating />
        </div>
      </div>

      {/* Footer */}
      {/* bg-secondary: A muted grey background */}
      {/* text-white: White text for contrast */}
      {/* p-3: Padding inside the footer */}
      {/* text-center: Center-align text */}
      {/* mt-auto: This is a flex utility that pushes the item to the end of the flex container (the very bottom) */}
      <Footer className="bg-secondary text-white p-3 text-center mt-auto" />
    </div>
  );
};

export default Layout;