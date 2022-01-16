import { EventEmitter } from "events";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import EmailEditor, { Design, UnlayerOptions, User } from "react-email-editor";
import { useAppServices } from "./AppServicesContext";
import { useAppSessionStateStatus } from "./AppSessionStateContext";
import { mergeTags } from "../external/merge.tags";

interface ExtendedUnlayerOptions extends UnlayerOptions {
  mergeTagsConfig: { sort: boolean };
}

interface ExtendedUnlayerUser extends User {
  signature?: string;
}

const SingletonDesignContext = createContext<Design | null>(null);
const SetSingletonDesignContext = createContext((design: Design | null) => {
  console.log("UNSET");
});

export const SingletonEditor = () => {
  const emptyDesign = {
    body: {
      rows: [],
    },
  };

  const appSessionStateStatus = useAppSessionStateStatus();

  const design = useContext(SingletonDesignContext);
  console.log("render", design);

  const {
    appConfiguration: { unlayerProjectId, unlayerEditorManifestUrl, loaderUrl },
    appSessionStateAccessor,
  } = useAppServices();

  const emailEditorRef = useRef<EmailEditor>(null);
  const [emailEditorLoaded, setEmailEditorLoaded] = useState(false);

  useEffect(() => {
    console.log("useEffect", design);
    if (emailEditorLoaded) {
      console.log("useEffect loaded", design);
      emailEditorRef?.current?.loadDesign(design || emptyDesign);
    }
  }, [design, emailEditorLoaded]);

  if (
    appSessionStateStatus !== "authenticated" ||
    appSessionStateAccessor.current.status !== "authenticated"
  ) {
    return null;
  }

  const { id, signature } = appSessionStateAccessor.current.unlayerUser;

  const user: ExtendedUnlayerUser = {
    // Ugly patch because Unlayer types does not accept string as id
    id: id as unknown as number,
    signature,
  };

  const unlayerOptions: ExtendedUnlayerOptions = {
    mergeTagsConfig: {
      sort: false,
    },
    mergeTags: mergeTags,
    user: user,
    customJS: [
      loaderUrl,
      `(new AssetServices()).load('${unlayerEditorManifestUrl}', []);`,
    ],
  };

  return (
    <div
      style={{ height: "calc(100% - 70px)", display: design ? "flex" : "none" }}
    >
      <EmailEditor
        style={{ minHeight: "100%" }}
        projectId={unlayerProjectId}
        key="email-editor-test"
        ref={emailEditorRef}
        onLoad={() => setEmailEditorLoaded(true)}
        options={unlayerOptions}
      />
    </div>
  );
};

//export const useSingletonDesign = () => useContext(SingletonDesignContext);
export const useSetSingletonDesign = () =>
  useContext(SetSingletonDesignContext);

// const SINGLETON_DESIGN_UPDATE = Symbol("SINGLETON_DESIGN_UPDATE");

// const eventEmitter = new EventEmitter();

// export const loadDesign = (design: Design) => {
//   eventEmitter.emit(SINGLETON_DESIGN_UPDATE, design);
// };

// export const unloadDesign = () => {
//   eventEmitter.emit(SINGLETON_DESIGN_UPDATE, null);
// };

export const SingletonDesignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [singletonDesign, setSingletonDesign] = useState<Design | null>(null);

  return (
    <SetSingletonDesignContext.Provider
      value={(design) => {
        console.log("DEFINED");
        setSingletonDesign(design);
      }}
    >
      <SingletonDesignContext.Provider value={singletonDesign}>
        {children}
      </SingletonDesignContext.Provider>
    </SetSingletonDesignContext.Provider>
  );
};
