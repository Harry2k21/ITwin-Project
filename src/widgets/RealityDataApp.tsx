/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect } from "react";
import { FrontstageManager } from "@itwin/appui-react";
import { Viewer, ViewerNavigationToolsProvider } from "@itwin/web-viewer-react";
import { RealityDataWidgetProvider } from "../RealityDataWidget";
import { ViewSetup } from "../common/ViewSetup";
import { authClient } from "../common/AuthorizationClient";
import { mapLayerOptions } from "../common/MapLayerOptions";


const uiProviders = [
  new RealityDataWidgetProvider(),
  new ViewerNavigationToolsProvider(),
];
const viewportOptions = {
  viewState: ViewSetup.getDefaultView,
};


const iTwinId = process.env.IMJS_ITWIN_ID;
const iModelId = process.env.IMJS_IMODEL_ID;

const RealityDataApp = () => {
  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  /** The sample's render method */

  return <Viewer
    iTwinId={iTwinId ?? ""}
    iModelId={iModelId ?? ""}
    authClient={authClient}
    viewportOptions={viewportOptions}
    defaultUiConfig={
      {
        hideStatusBar: true,
        hideToolSettings: true,
      }
    } enablePerformanceMonitors={false}
    uiProviders={uiProviders}
    mapLayerOptions={mapLayerOptions}
    theme="dark"
  />;

};

// Define panel size
FrontstageManager.onFrontstageReadyEvent.addListener((event) => {
  const { bottomPanel } = event.frontstageDef;
  bottomPanel && (bottomPanel.size = 200);
});

export default RealityDataApp;
