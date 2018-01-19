export interface IUser {
    SAMAccountName: string;
    Mail: string;
    GivenName: string;
    SN: string;
    TelephoneNumber: string;
}
export interface IUserInfo {
    CurrentUser: IUser;
    CurrentUserEmployeeCount: number;
    CurrentUserHasMobileApprovalAccess: boolean;
    CurrentDatabaseTime: DateTimeFormat;
    CurrentWeekEndDate: DateTimeFormat;
    CurrentWeekCloseDate: DateTimeFormat;
}
