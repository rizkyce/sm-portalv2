import React, { useState } from "react";
import deviceTemplates from "@/utils/deviceTemplate.json";

export default function Form() {
  const [name, setName] = useState("");
  const [deviceTemplate, setDeviceTemplate] = useState("");
  const [voiceCommand, setVoiceCommand] = useState("");
  const [devId, setDevId] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDeviceTemplateChange = (event) => {
    setDeviceTemplate(event.target.value);
  };

  const handleVoiceCommandChange = (event) => {
    setVoiceCommand(event.target.value);
  };

  const handleDevIdChange = (event) => {
    setDevId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Device Template:", deviceTemplate);
    console.log("Voice Command:", voiceCommand);
    console.log("Device ID:", devId);
    setName("");
    setDeviceTemplate("");
    setVoiceCommand("");
    setDevId("");
  };

  return (
    <main className="flex-1 p-4 bg-white border-2 border-gray-200 rounded-[40px] ml-4 mr-4">
      <h1 className="text-center font-bold text-xl text-gray-500 mb-24">
        Add Device
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Form input elements */}
        <div className="flex flex-col mt-4">
          <label htmlFor="name" className="text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border-2 border-gray-300 p-2 rounded-xl"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="deviceTemplate" className="text-gray-600 mb-2">
            Device Template
          </label>
          <select
            id="deviceTemplate"
            className="border-2 border-gray-300 p-2 rounded-xl"
            value={deviceTemplate}
            onChange={handleDeviceTemplateChange}
          >
            {deviceTemplates.templates.map((template, index) => (
              <option key={index} value={template.value}>
                {template.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="devId" className="text-gray-600 mb-2">
            Voice Command
          </label>
          <input
            type="text"
            id="voiceCommand"
            className="border-2 border-gray-300 p-2 rounded-xl"
            value={voiceCommand}
            onChange={handleVoiceCommandChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="devId" className="text-gray-600 mb-2">
            Device ID (Scan QR code or manual input)
          </label>
          <input
            type="text"
            id="devId"
            className="border-2 border-gray-300 p-2 rounded-xl"
            value={devId}
            onChange={handleDevIdChange}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-white border border-blue-600  hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-2 px-4 rounded-full"
          >
            Add
          </button>
        </div>
      </form>
    </main>
  );
}
