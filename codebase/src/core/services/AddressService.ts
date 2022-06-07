class AddressService {
  public static addressToString(
    string1: string,
    string2: string,
    string3: string,
    string4: string,
    string5: string
  ) {
    return (
      string1 + ' ' + string2 + ', ' + string3 + ' ' + string4 + ', ' + string5
    );
  }
}

export default AddressService;
