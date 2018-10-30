import { RepairServicesModule } from './repair-services.module';

describe('RepairServicesModule', () => {
  let repairServicesModule: RepairServicesModule;

  beforeEach(() => {
    repairServicesModule = new RepairServicesModule();
  });

  it('should create an instance', () => {
    expect(repairServicesModule).toBeTruthy();
  });
});
