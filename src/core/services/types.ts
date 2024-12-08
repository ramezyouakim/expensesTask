export interface ServiceAppStartHandler {
  onAppStart: () => Promise<void>;
}
