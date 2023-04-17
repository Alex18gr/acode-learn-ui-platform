export class ResourceTypes {
  public static RESOURCE_LINK = 'RESOURCE_LINK';
  public static RESOURCE_FILE = 'RESOURCE_FILE';
  public static RESOURCE_REPOSITORY = 'RESOURCE_REPOSITORY';
  public static RESOURCE_CODE_SNIPPET = 'RESOURCE_CODE_SNIPPET';
  public static RESOURCE_MARKDOWN = 'RESOURCE_MARKDOWN';
  public static RESOURCE_GUIDE = 'RESOURCE_GUIDE';
  public static ResourceTypesList = [
    ResourceTypes.RESOURCE_LINK,
    ResourceTypes.RESOURCE_FILE,
    ResourceTypes.RESOURCE_REPOSITORY,
    ResourceTypes.RESOURCE_CODE_SNIPPET,
    ResourceTypes.RESOURCE_MARKDOWN,
    ResourceTypes.RESOURCE_GUIDE,
  ];
  public static ResourceTypesListSelect: { name: string; value: string }[] = [
    { name: 'Link', value: ResourceTypes.RESOURCE_LINK },
    { name: 'File', value: ResourceTypes.RESOURCE_FILE },
    { name: 'Repository', value: ResourceTypes.RESOURCE_REPOSITORY },
    { name: 'Code Snippet', value: ResourceTypes.RESOURCE_CODE_SNIPPET },
    { name: 'Markdown Document', value: ResourceTypes.RESOURCE_MARKDOWN },
    { name: 'Guide', value: ResourceTypes.RESOURCE_GUIDE },
  ];
  public static ResourceTypeExists(resType: string) {
    for (const value of ResourceTypes.ResourceTypesList) {
      if (resType === value) {
        return true;
      }
    }
    return false;
  }
}
