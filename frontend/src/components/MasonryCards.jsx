import React from "react";

const MasonryCards = ({ data }) => {
  return (
    <div className="masonry column-1 sm:columns-2 md:columns-3 max-w-[1320px] w-full px-[20px] mt-[60px]">
      {data?.map((photo, index) => (
        <div className="item" key={index}>
          <img
            key={photo?.id}
            src={photo?.urls?.regular}
            alt={photo?.alt_description}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryCards;
