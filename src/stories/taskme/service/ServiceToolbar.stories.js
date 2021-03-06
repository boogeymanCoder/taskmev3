import React from "react";
import { default as ServiceToolbarComponent } from "/src/components/service/ServiceToolbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Service/Service Toolbar",
  component: ServiceToolbarComponent,
  argTypes: {
    handleAddService: { action: "handleAddService" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ServiceToolbarComponent {...args} />;

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {};

export const Enabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Enabled.args = {
  sortEnabled: true,
  searchEnabled: true,
};

export const SearchOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchOnly.args = {
  sortEnabled: false,
  searchEnabled: true,
};

export const SortOnly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SortOnly.args = {
  sortEnabled: true,
  searchEnabled: false,
};
