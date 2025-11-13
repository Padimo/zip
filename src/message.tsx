import { Form, ActionPanel, Action, showToast, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

type Values = {
  message: string;
  recipient: string;
  normal: string;
};

export default function Command() {
  function handleSubmit(values: Values) {
    if (values.normal != "other") {
      values.recipient = values.normal;
    }
    const res = runAppleScript(
      `
on run {targetBuddyPhone, targetMessage}
    tell application "Messages"
        set targetService to 1st service whose service type = iMessage
        set targetBuddy to buddy targetBuddyPhone of targetService
        send targetMessage to targetBuddy
    end tell
end run
`,
      [values.recipient, [values.message]]
    );
    showHUD("Message sent");

    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Send a message to a phone number." />
      <Form.TextField id="message" title="Message" placeholder="Enter message" />
      <Form.TextField id="recipient" title="Recipient" placeholder="Enter recipient" />
      <Form.Dropdown id="normal" title="Dropdown" defaultValue="other" >
        <Form.Dropdown.Item value="other" title="other" />"
        <Form.Dropdown.Item value="4433559430" title="Prarthana" />
        <Form.Dropdown.Item value="4437188486" title="Ben Fichter" />
        <Form.Dropdown.Item value="4436178933" title="Mom" />
        <Form.Dropdown.Item value="4436178932" title="Dad" />
        <Form.Dropdown.Item value="9143097527" title="Rishitji" />
        <Form.Dropdown.Item value="4439380317" title="Keegan" />
        <Form.Dropdown.Item value="2402785052" title="Gabe" />
        <Form.Dropdown.Item value="4437458125" title="Gavin" />
        <Form.Dropdown.Item value="4437188486" title="Aadarsh" />
      </Form.Dropdown>
    </Form>
  );
}
