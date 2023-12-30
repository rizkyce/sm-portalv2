"use client";

import React, { useState } from "react";
import VoiceControl from "@/components/Recognition/VoiceControl";
import Sidebar from "@/components/Sidebar/page";
import Devices from "@/components/Devices/page";
import Form from "@/components/AddDevice/page";

export default function Page() {
  const [activePage, setActivePage] = useState("devices");

  return (
    <div className="flex pt-16">
      <Sidebar setActivePage={setActivePage} />
      {activePage === "devices" && <Devices />}
      {activePage === "addDevice" && <Form />}
    </div>
  );
}
