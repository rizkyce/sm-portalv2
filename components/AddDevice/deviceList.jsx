import React from "react";
import Image from "next/image";

const DeviceList = ({ devices, handleControlDevice }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {devices.map((device) => (
        <li
          key={device.id}
          className="bg-white border-2 border-blue-200 rounded-[36px] p-4 flex flex-col items-center"
        >
          <div className="flex items-center">
            <Image
              src={device.icon}
              alt={`${device.name} icon`}
              width={1000}
              height={1000}
              className="w-12 h-12 mr-4"
            />

            <div>
              <h3 className="text-lg font-semibold text-blue-800">
                {device.name}
              </h3>
              <p>
                Status:{" "}
                <span className="font-bold text-green-500">
                  {device.status}
                </span>{" "}
              </p>
            </div>
          </div>

          <div className="mt-3 items-center">
            {device.command.map((message) => (
              <button
                key={message.name}
                onClick={() => handleControlDevice(device.id, message.message)}
                className="bg-white border border-blue-700 hover:bg-blue-700 hover:text-white text-blue-500 py-1 px-3 rounded-full mr-2 mb-2"
              >
                {message.name}
              </button>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
