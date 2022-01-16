import { EventEmitter } from "events";
import { createContext, useContext, useEffect, useState } from "react";
import { Design } from "react-email-editor";
import { Editor } from "./Editor";

const emptyDesign = {
  body: {
    rows: [],
  },
};

const SingletonDesignContext = createContext<Design>(emptyDesign);

export const SingletonEditor = () => {
  const design = useContext(SingletonDesignContext);
  return <Editor design={design} />;
};

const SINGLETON_DESIGN_UPDATE = Symbol("SINGLETON_DESIGN_UPDATE");

const eventEmitter = new EventEmitter();

export const loadDesign = (design: Design) => {
  eventEmitter.emit(SINGLETON_DESIGN_UPDATE, design);
};

export const unloadDesign = () => {
  eventEmitter.emit(SINGLETON_DESIGN_UPDATE, emptyDesign);
};

export const SingletonDesignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [singletonDesign, setSingletonDesign] = useState(emptyDesign);

  useEffect(() => {
    eventEmitter.on(SINGLETON_DESIGN_UPDATE, (design) => {
      setSingletonDesign(design);
    });
  }, []);

  return (
    <SingletonDesignContext.Provider value={singletonDesign}>
      {children}
    </SingletonDesignContext.Provider>
  );
};
