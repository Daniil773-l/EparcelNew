import React from "react";
import { useLocation } from "react-router-dom";
import RegularHeader from "./RoomHeader";

const ConditionalHeader = () => {
    const location = useLocation();

    // Define admin routes here
    const adminRoutes = ["/admin"];

    // Check if the current path is an admin route
    const isAdminRoute = adminRoutes.some(route => location.pathname.startsWith(route));

    // Render RegularHeader only if the route is not an admin route
    if (!isAdminRoute) {
        return <RegularHeader />;
    }

    // If it's an admin route, render nothing
    return null;
};

export default ConditionalHeader;
