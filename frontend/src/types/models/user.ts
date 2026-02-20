import { IndustryTypeKey } from "../enums/industry";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  businessName?: string;
  businessType?: IndustryTypeKey;
  otherBusinessType?: string;
  createdAt: Date;
  updatedAt: Date;
}
